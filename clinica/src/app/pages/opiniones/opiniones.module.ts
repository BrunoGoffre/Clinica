import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionesComponent } from './opiniones.component';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { GeneralComponentsModule } from 'src/app/components/general-components.module';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [
        OpinionesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        AccordionModule,
        GeneralComponentsModule,
        CardModule
    ],
    exports: [
        OpinionesComponent
    ],
})
export class OpinionesModule { }

