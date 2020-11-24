import {Component} from '@angular/core';
import {TokenService} from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petquest';

  constructor(private tokenService: TokenService) {
    const token = this.tokenService.get('token');
  }
}
