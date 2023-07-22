import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePath } from '../app-routing.module';
import { LobbyService } from './services/lobby.service';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.css']
})
export class LobbyPageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private lobbyService: LobbyService){}

  lobbyId: string | undefined;
  testPlayer= new FormArray([new FormControl("Jule Vern")]);

  ngOnInit(): void {
    this.lobbyId =String(this.activatedRouter.snapshot.params['id']);
    this.lobbyService.createLobby(this.lobbyId, "Jule Vern");
  }

  ngOnDestroy() {
    this.lobbyService.unsubscribeLobby();
  }

  navigateToLandingPage() {
      this.router.navigateByUrl(BasePath);
  }
}
