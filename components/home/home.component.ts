import { Component , ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor (private modalService: NgbModal){}


  ngOnInit(): void {}

  openScrollableContent(content) {
    this.modalService.open(content, { scrollable: true, size:'lg' });

  }
}
