import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuItemComponent } from '../../menu-item/menu-item/menu-item.component';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'pd-tiered-menu',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, AvatarModule],
  templateUrl: './tiered-menu.component.html',
  styleUrl: './tiered-menu.component.css'
})
export class TieredMenuComponent {

  menu: Array<MenuItem> = [
    {label: 'Dashboard', icon: 'pi pi-home'},
    {label: 'Customer', icon: 'pi pi-users'},
    {label: 'Product', icon: 'pi pi-cog'}
  ]
}
