import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../../services/colors/colors.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  public colors: any[];

  constructor(private colorsService: ColorsService) {}

  ngOnInit(): void {
    this.colorsService.getColors().subscribe(colors => {
      this.colors = colors;
    });
  }

  deleteColor(id: string): void {
    this.colorsService.removeColor(id).subscribe(() => {
      this.colors = this.colors.filter(color => color._id !== id);
    });
  }
}
