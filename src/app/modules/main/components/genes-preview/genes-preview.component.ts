import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GENE_EVENT } from '@app/core/enums/gene.enum';
import { TableItem } from '@app/core/models/gene.model';
import { GenesService } from '@app/core/services/genes.service';
// import { EGene }

@Component({
  selector: 'genes-preview',
  templateUrl: './genes-preview.component.html',
  styleUrls: ['./genes-preview.component.scss']
})
export class GenesPreviewComponent implements OnInit {
  get yellow() { return 'rgb(255, 208, 17)' }
  get blue() { return 'rgb(222, 236, 255)' }
  constructor(private genesService: GenesService) { }

  @ViewChild('matrix') matrix!: ElementRef;

  // gene: number | undefined;
  // start: number | undefined;
  // length: number | undefined;

  tableItems: TableItem[] = [];
  // genes
  interval!: any;

  ngOnInit(): void {
    this.genesData$();
  }

  genesData$() {
    this.genesService.geneDataChanges$.subscribe(e => {
      console.log('genes changes')
      const index = this.tableItems.findIndex(item => item.id == e.id);

      if (e.event != GENE_EVENT.RESET && e.value && e.value != '') {
        if (index == -1) {
          const item: TableItem = { id: e.id };
          item[e.event] = e.value;
          this.tableItems.push(item);
          this.changeColor(this.tableItems[this.tableItems.length - 1]);
        } else {

          this.tableItems[index][e.event] = e.value;
          this.changeColor(this.tableItems[index]);
        }
      }

      if(e.event == GENE_EVENT.RESET) {
        if(index) this.tableItems.splice(index, 1);
        this.changeColor(this.tableItems[index]);
      }

      // if(index) this.changeColor()
    })
  }

  processTableContent() {

  }

  changeColor(item: TableItem) {

    console.log('table item', item.gene, item.length, item.start)
    console.log(this.tableItems)
    if (item.start == undefined || item.length == undefined) {
      if (item.gene != undefined) this.clear('row', +item.gene);
      return;
    }
    if (item.gene == undefined) return;
    const gene = +item.gene;
    const start = +item.start;
    const length = +item.length;

    const genes = this.matrix.nativeElement.getElementsByClassName('gene');
    const cells = genes[gene].getElementsByClassName('cell');

    let i = start;

    // Clear unused bits
    for (let j = i; j < start; j++) cells[j].style.backgroundColor = this.blue;
    for (let j = start + length; j < cells.length; j++) cells[j].style.backgroundColor = this.blue;

    // Paint bits
    if (this.interval) this.clear('row', gene);

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (length == undefined || start == undefined) return;
      if (i >= length + start) {
        clearInterval(this.interval);
        return;
      }
      cells[i].style.backgroundColor = this.yellow;
      i++;


    }, 30)
  }

  clear(clear: 'row' | 'all', gene: number | undefined = undefined) {
    if (clear == 'row') {
      if (gene == undefined) return;
      const genes = this.matrix.nativeElement.getElementsByClassName('gene');
      for (let cell of genes[gene].getElementsByClassName('cell')) {
        cell.style.backgroundColor = this.blue;
      }
    }

  }



}
