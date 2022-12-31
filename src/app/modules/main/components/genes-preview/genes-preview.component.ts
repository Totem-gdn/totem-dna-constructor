import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenesService } from '@app/core/services/genes.service';
import { EGene } from '../../enums/gene.enum';

@Component({
  selector: 'genes-preview',
  templateUrl: './genes-preview.component.html',
  styleUrls: ['./genes-preview.component.scss']
})
export class GenesPreviewComponent implements OnInit {
  get yellow() { return 'rgb(255, 208, 17)' }
  get blue() { return 'rgb(222, 236, 255)'}
  constructor(private genesService: GenesService) { }

  @ViewChild('matrix') matrix!: ElementRef;

  gene: number | undefined;
  offset: number | undefined;
  length: number | undefined;
  interval!: any;

  ngOnInit(): void {
    this.genesData$();
  }

  genesData$() {
    this.genesService.geneDataChanges$.subscribe(e => {
      console.log(e);

      if(e.event == EGene.GENE) {
         if(e.value == '') this.gene = undefined;
         else this.gene = +e.value;
      }
      if(e.event == EGene.OFFSET) {
        if(e.value == '') this.offset = undefined;
        else this.offset = +e.value;
      }
      if(e.event == EGene.LENGTH) {
        if(e.value == '') this.length = undefined;
        else this.length = +e.value;
      }
      this.changeColor();
    })
  }

  changeColor() {
    console.log(this.offset, this.length, this.gene)
    if(this.offset == undefined || this.length == undefined) {
      if(this.gene != undefined) this.clear('row', this.gene);
      return;
    }
    if(this.gene == undefined) return;

    const genes = this.matrix.nativeElement.getElementsByClassName('gene');
    const cells = genes[this.gene].getElementsByClassName('cell');

    let i = this.offset;

    // Clear unused bits
    for(let j = i; j < this.offset; j++) cells[j].style.backgroundColor = this.blue;
    for(let j = this.offset + this.length; j < cells.length; j++) cells[j].style.backgroundColor = this.blue;

    // Paint bits
    if(this.interval) this.clear('row', this.gene);
    
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.length == undefined || this.offset == undefined) return;
      if(i >= this.length + this.offset) {
        clearInterval(this.interval);
        return;
      }
      console.log('paint')
      cells[i].style.backgroundColor = this.yellow;
      i++;


    }, 30)

    // const interval = () => {
    //   cells[i].style.backgroundColor = this.yellow;
    //   i++;
    //   if(this.length == undefined || this.offset == undefined) return;
    //   if(i > this.length + this.offset) clearInterval(this.interval);
    // }
    // for( ; i++) {
      
    // }
  }

  clear(clear: 'row' | 'all', gene: number | undefined = undefined) {
    if(clear == 'row') {
      if(gene == undefined) return;
      const genes = this.matrix.nativeElement.getElementsByClassName('gene');
      for(let cell of genes[gene].getElementsByClassName('cell')) {
        cell.style.backgroundColor = this.blue;
      }
    }

  }



}
