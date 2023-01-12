import { trigger, transition, style, animate } from "@angular/animations";


export const Animations = {
    animations: [
        trigger(
            'fade-in-out',
            [
              transition(
                ':enter',
                [
                  style({ opacity: 0, position: "{{position}}" }),
                  animate("{{duration}} {{delay}} ease-in-out",
                    style({ opacity: "{{in}}", position: "{{position}}" }))
                ], { params: { in: 1, out: 0, position: '', duration: '0.3s', delay: '0s' } }
              ),
              transition(
                ':leave',
                [
                  style({ opacity: "{{in}}", position: "{{position}}" }),
                  animate("{{duration}} {{delay}} ease-in-out",
                  style({ opacity: 0, position: "{{position}}" }))
                ], { params: { in: 1, out: 0, position: '', duration: '0.3s', delay: '0s' } }
              )
            ]
          ),
    ]
}