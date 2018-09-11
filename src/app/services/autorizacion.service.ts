import { Injectable } from '@angular/core';

@Injectable()
export class AutorizacionService {
  
  constructor() { }
  public login (email,pass){
    console.log('emtodo del login');
  }
  public registro(email,pass){
    console.log('medotod de registro');
  }
}