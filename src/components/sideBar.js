import { $app } from '../app';

require('../css/sideBar.css');

export function sideBar(){
    const $sideBar = document.createElement('div');
    $sideBar.id = 'sideBar';
    $app.appendChild($sideBar);
}