import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { List2Page } from '../list-2/list-2';
import { ProfilePage } from '../profile/profile';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = HomePage;
    this.tab2Root = ProfilePage;
    this.tab3Root = NotificationsPage;
  }
}
