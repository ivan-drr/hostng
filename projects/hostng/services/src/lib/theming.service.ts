import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class ThemeManager {
    themes!: any;
    selectedTheme!: string;
    private themeLink!: HTMLLinkElement;

    constructor(@Inject(DOCUMENT) private document: Document, private afStore: AngularFirestore) {
        this.assignThemeLink();

        this.themes = [
            { theme: 'lara-dark-blue', name: 'Lara Azul oscuro', file: '.png' },
            { theme: 'lara-dark-purple', name: 'Lara Morado oscuro', file: '.png' },
            { theme: 'lara-dark-indigo', name: 'Lara Añil oscuro', file: '.png' },
            { theme: 'lara-dark-teal', name: 'Lara Verde oscuro', file: '.png' },
            { theme: 'lara-light-blue', name: 'Lara Azul claro', file: '.png' },
            { theme: 'lara-light-purple', name: 'Lara Morado claro', file: '.png' },
            { theme: 'lara-light-indigo', name: 'Lara Añil claro', file: '.png' },
            { theme: 'lara-light-teal', name: 'Lara Verde claro', file: '.png' },

            { theme: 'bootstrap4-dark-blue', name: 'Bootstrap4 Azul oscuro', file: '.svg' },
            { theme: 'bootstrap4-dark-purple', name: 'Bootstrap4 Morado oscuro', file: '.svg' },
            { theme: 'bootstrap4-light-blue', name: 'Bootstrap4 Azul claro', file: '.svg' },
            { theme: 'bootstrap4-light-purple', name: 'Bootstrap4 Morado claro', file: '.svg' },
            { theme: 'luna-amber', name: 'Luna Ambar', file: '.png' },
            { theme: 'luna-blue', name: 'Luna Azul', file: '.png' },
            { theme: 'luna-green', name: 'Luna Verde', file: '.png' },
            { theme: 'luna-pink', name: 'Luna Rosa', file: '.png' },

            { theme: 'md-dark-deeppurple', name: 'Material Design Morado oscuro', file: '.svg' },
            { theme: 'md-dark-indigo', name: 'Material Design Añil oscuro', file: '.svg' },
            { theme: 'md-light-deeppurple', name: 'Material Design Morada claro', file: '.svg' },
            { theme: 'md-light-indigo', name: 'Material Design Añil claro', file: '.svg' },
            { theme: 'md-dark-deeppurple', name: 'Material Design Compact Morda oscuro', file: '.svg' },
            { theme: 'md-dark-indigo', name: 'Material Design Compact Añil oscuro', file: '.svg' },
            { theme: 'md-light-deeppurple', name: 'Material Design Compact Morado claro', file: '.svg' },
            { theme: 'md-light-indigo', name: 'Material Design Compact Añil claro', file: '.svg' },

            { theme: 'saga-blue', name: 'Saga Azul', file: '.png' },
            { theme: 'saga-green', name: 'Saga Verde', file: '.png' },
            { theme: 'saga-orange', name: 'Saga Naranja', file: '.png' },
            { theme: 'saga-purple', name: 'Saga Morado', file: '.png' },
            { theme: 'vela-blue', name: 'Vela Azul', file: '.png' },
            { theme: 'vela-green', name: 'Vela Verde', file: '.png' },
            { theme: 'vela-orange', name: 'Vela Naranja', file: '.png' },
            { theme: 'vela-purple', name: 'Vela Morado', file: '.png' },
        ]
    }

    assignThemeLink() {
        const themeRef = this.document.getElementById("app-theme") as HTMLLinkElement;
        if (!themeRef) {
            const link = document.createElement('link');
            link.id = 'app-theme';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'bootstrap4-light-blue.css';

            this.themeLink = this.document.getElementsByTagName('head')[0].appendChild(link) as HTMLLinkElement;
        } else this.themeLink = themeRef;
    }

    getThemeProperties(theme: string) {
        return this.themes.find((t: any) => t.theme === theme);
    }

    updateDefaultTheme(event: any, rid: string): string {
        if (!event) return '';
        if (!event.value) return '';
        const theme = event.value.theme;

        this.applyTheme(theme);
        this.selectedTheme = theme;
        this.afStore.firestore.collection("restaurants").doc(rid).update({ defaultTheme: theme });

        return theme;
    }

    async loadDefaultThemeInComponent(rid: string): Promise<string> {
        let currentTheme = '';
        if (!this.themeLink) return currentTheme;

        await this.getDefaultTheme(rid).then(theme => currentTheme = theme);

        // Enhance user experience reducing screen flashs on theme load
        await new Promise(r => setTimeout(r, 0));
        return currentTheme;
    }

    async getDefaultTheme(rid: string) {
        return await this.afStore.firestore.collection("restaurants").doc(rid).get().then((docData) => {
            const data = docData.data();
            if (data !== undefined) this.applyTheme(data["defaultTheme"]);

            return data ? data["defaultTheme"] : '';
        });
    }

    applyTheme(theme: string) {
        if (!this.themeLink) return;
        if (this.themeLink.href !== theme + '.css') this.themeLink.href = theme + '.css';
    }
}