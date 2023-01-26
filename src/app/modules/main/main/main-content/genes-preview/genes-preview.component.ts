import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ASSET_TYPE } from '@app/core/enums/asset.enum';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { TableItem } from '@app/core/models/gene.model';
import { AssetsService } from '@app/core/services/assets.service';
import { GenesService } from '@app/core/services/genes.service';
import { PropertiesService } from '@app/core/services/properties.service';
import { lookup } from 'dns';
import { Subject, takeUntil } from 'rxjs';
// import { EGene }

@Component({
  selector: 'genes-preview',
  templateUrl: './genes-preview.component.html',
  styleUrls: ['./genes-preview.component.scss']
})
export class GenesPreviewComponent implements OnInit, OnDestroy {
  get assetType() { return ASSET_TYPE };
  get yellow() { return 'rgb(255, 208, 17)' }
  get blue() { return 'rgb(222, 236, 255)' }
  get red() { return 'red' }

  constructor(private genesService: GenesService,
              private assetsService: AssetsService,
              private propertiesService: PropertiesService) { }

  @ViewChild('matrix') matrix!: ElementRef;

  // gene: number | undefined;
  // start: number | undefined;
  // length: number | undefined;

  tableItems: TableItem[] = [];
  // genes
  interval!: any;
  timeout!: any;
  subs = new Subject<void>();
  type?: ASSET_TYPE;

  ngOnInit(): void {
    this.genesData$();
    this.type$();
  }

  genesData$() {
    this.genesService.geneDataChanges$
      .pipe(takeUntil(this.subs))
      .subscribe(e => {

      const index = this.tableItems.findIndex(item => item.id == e.id);
      console.log('index', index)
      const length = e.values?.length;
      const start = e.values?.start;
      const gene = e.values?.gene;

      if (e.event == GENE_EVENT.RESET) {
        this.repaintItem('clear', this.tableItems[index]);
        if (index != -1) this.tableItems.splice(index, 1);
        return;
      }

      if (e.event == GENE_EVENT.RESET_ALL) {
        this.clear('all');
        return;
      }
      // console.log(start, length, gene)
      if (e.event == GENE_EVENT.PAINT) {
        console.log('start',start, 'length', length, 'gene', gene)
        if(start == undefined || length == undefined || gene == undefined) {
          this.repaintItem('clear', this.tableItems[index]);
          return;
        }

        const item: TableItem = { id: e.id };
        item.length = +length;
        item.start = +start;
        item.gene = +gene;

        if (index == -1) {
          this.tableItems.push(item);
          this.repaintItem('paint', this.tableItems[this.tableItems.length - 1])
        } else {
          this.repaintItem('clear', this.tableItems[index]);
          this.tableItems[index] = item;
          this.repaintItem('paint', this.tableItems[index])
        }
      }


    })
  }

  type$() {
    this.assetsService.assetType$
      .pipe(takeUntil(this.subs))
      .subscribe(type => {
        this.type = type;
        // this.redrawGridCols();
      })
  }


  repaintItem(action: 'paint' | 'clear', item: TableItem) {
    if (item?.gene == undefined || item?.length == undefined || item?.start == undefined) return;
    let allRed: boolean = false;

    if(!this.matrix || !item) return;

    const gene = +item.gene;
    const start = +item.start;
    const length = +item.length;

    const genes = this.matrix.nativeElement.getElementsByClassName('gene');
    if(!genes?.length) return;
    const cells = genes[gene].getElementsByClassName('cell');

    const maxCells = this.type == ASSET_TYPE.AVATAR ? 32 : this.type == ASSET_TYPE.ITEM ? 24 : 16;

    if(start + length > maxCells) allRed = true;

    // Get neighbor items on the same row
    const neighborItems = this.tableItems.filter(neighborItem => {
      return neighborItem.gene == gene && neighborItem != item
    });

    // Start index of selected item
    let i = start;

    // Paint cells of selected item
    loop:
    for (; i < length + start; i++) {

      // Check if cells is not overlaping
      for (let neighborItem of neighborItems) {
        if (neighborItem.gene == undefined || neighborItem.start == undefined || neighborItem.length == undefined) continue;
        for (let j = neighborItem.start; j < neighborItem.start + neighborItem.length; j++) {
          if (j == i) {
            // If overlap occured paint cell depending on action
            if (action == 'paint') cells[i].style.backgroundColor = this.red;
            if (action == 'clear') cells[i].style.backgroundColor = this.yellow;
            continue loop;
          }
        }
      }
      // If overlap is not occured paint cell depending on action
      if(!cells[i]) continue;
      if (action == 'paint') {
        if(allRed) {
          cells[i].style.backgroundColor = this.red;
          continue;
        }
        cells[i].style.backgroundColor = this.yellow;
      }
      if (action == 'clear') cells[i].style.backgroundColor = this.blue;
    }
  }
  clearItem(item: TableItem) {

  }

  clear(clear: 'row' | 'all', gene: number | undefined = undefined) {
    if (clear == 'row') {
      if (gene == undefined) return;
      const genes = this.matrix.nativeElement.getElementsByClassName('gene');
      for (let cell of genes[gene].getElementsByClassName('cell')) {
        cell.style.backgroundColor = this.blue;
      }
    }

    if (clear == 'all') {
      this.tableItems = [];
      const genes = this.matrix.nativeElement.getElementsByClassName('gene');
      // console.log('reset all')
      for(let gene of genes) {
        for (let cell of gene.getElementsByClassName('cell')) {
          cell.style.backgroundColor = this.blue;
        }
      }
    }
  }

  // redrawGridCols() {
  //   if(!this.matrix) return;
  //   const matrix = this.matrix.nativeElement;
  //   const cols = this.type == ASSET_TYPE.AVATAR ? 3 : this.type == ASSET_TYPE.ITEM ? 4 : 2;
  //   const title = matrix.getElementsByClassName('title')[0]
  //   title.style.gridTemplateColumns = `50px repeat(${cols}, 1fr)`;

  //   const genes = matrix. getElementsByClassName('gene');
  //   for(let gene of genes) {
  //     gene.style.gridTemplateColumns = `50px repeat(${cols}, 1fr)`;
  //   }
  // }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
