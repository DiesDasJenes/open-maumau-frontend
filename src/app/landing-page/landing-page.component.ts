import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyPage } from '../app-routing.module';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  landingPageForm!: FormGroup;

  constructor(
    private router: Router
  ) {}
  ngOnInit(): void {
    this.landingPageForm = new FormGroup({player_alias: new FormControl('', [Validators.required, Validators.minLength(1)])});
  }
 
  get player_alias_control(){
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.landingPageForm.get('player_alias')!;
  }


  navigateToLobby() {
    if (this.landingPageForm.valid) {
      this.router.navigateByUrl(LobbyPage.replace(':id', uuidv4()));
    }  else {
      this.player_alias_control.markAllAsTouched();
    } 
  }
}
