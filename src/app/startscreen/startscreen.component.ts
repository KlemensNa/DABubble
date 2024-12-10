import { Component, inject, Injectable } from '@angular/core';
import { User } from '../models/user.class';
import { getDocs, query, collection, where, deleteDoc, Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
  
export class StartscreenComponent {
    firestore: Firestore = inject(Firestore);
    isLogin = true;
    isSignup = false;
    isResetPassword = false;
    isSelectAvatar = false;
    isImprint = false;
    isPrivacy = false;
    isMain = false;
    viewsHistory: Array<'login' | 'signup' | 'resetPassword' | 'selectAvatar' | 'imprint' | 'privacy'> = [];
    currentView: 'login' | 'signup' | 'resetPassword' | 'selectAvatar' | 'imprint'| 'privacy' = 'login';
    userData: User = new User();

    ngOnInit(){
        // this.deleteChatOfKa()
    }
   
    toggleView(view: 'login' | 'signup' | 'resetPassword' | 'selectAvatar' | 'imprint' | 'privacy' | undefined = 'login', data?: User): void {
        this.viewsHistory.push(this.currentView);
        this.currentView = view;
        if (view === 'privacy') {
            this.isPrivacy = true;
            this.isImprint = false;
        } else if (view === 'imprint') {
            this.isImprint = true;
            this.isPrivacy = false;
        } else {
            this.isPrivacy = false;
            this.isImprint = false;
            this.isSignup = view === 'signup';
            this.isLogin = view === 'login';
            this.isResetPassword = view === 'resetPassword';
            this.isSelectAvatar = view === 'selectAvatar';
        
            if (this.isSelectAvatar && data) {
                this.userData = data;
            }
        }
    }

    goBack(): void {
        if (this.viewsHistory.length > 0) {
            let lastView = this.viewsHistory.pop();
            while (lastView === 'privacy' || lastView === 'imprint') {
                lastView = this.viewsHistory.pop();
            }
            this.toggleView(lastView);
        }
    }


    // Delete Chats automatically
    // async deleteChatOfKa() {

    //     const querySnapshot = await getDocs(
    //       query(collection(this.firestore, 'chats'), where('chatname', '==', "Ka & Gast"))
    //     );
    //     if (!querySnapshot.empty) {
    //       querySnapshot.forEach(async (chat) => {
    //         await deleteDoc(chat.ref)
    //         console.log("GuestChat deleted ", chat.data()['chatname']) 
    //       })
    //     } else {
    //      console.warn('no Guest Chats to delete')
    //     }
    //   }
}