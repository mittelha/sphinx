import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaqService } from '../core/faq.service';
import { read, simpler } from '../../main';

@Component({
    selector: 'app-sphinx',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sphinx.component.html',
    styleUrl: './sphinx.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SphinxComponent {
    @Input()
    ecranEtroit: boolean = false;

    question: string = '';
    reponse: string = '';

    constructor(private faqService: FaqService) {}

    @HostListener('document:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.verifierQuestion();
        }
    }

    verifierQuestion() {
        if (this.question) {
            const ret = this.faqService.getR(read(simpler(this.question)));
            this.reponse = ret
                ? ret.reponse + '.jpg'
                : `no${Math.floor(Math.random() * 6) + 1}.gif`;
        }
    }
}