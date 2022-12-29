import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'genes-preview',
  templateUrl: './genes-preview.component.html',
  styleUrls: ['./genes-preview.component.scss']
})
export class GenesPreviewComponent implements OnInit {

  constructor() { }

  genes: Array<string>[] = [].constructor(24);

  ngOnInit(): void {
    this.handleGenesContent();
  }

  handleGenesContent() {

    for(let i = 0; i < this.genes.length; i++) {
      for(let j = 0; j < 32; j++) {
        this.genes[i] = new Array;
        this.genes[i][j] = '#DEECFF';
      }
      // this.genes[i] = [].constructor(32);
    }
    
    // for(let gene of this.genes) {
    //   gene = [].constructor(31);
    // }
    console.log(this.genes[0][5])
  }

}
