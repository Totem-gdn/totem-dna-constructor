import { trigger, transition, style, animate, group } from "@angular/animations";


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
          trigger(
            'showError',
            [
              transition(
                ':enter',
                [
                  style({ height: 0, opacity: 0 }),
                  group([
                    animate('0.3s ease-in-out',
                      style({ height: 31 })),
                    animate('0.3s 0.2s ease-in-out',
                      style({ opacity: 1 }))
                  ])
                ]
              ),
              transition(
                ':leave',
                [
                  style({ height: 31, opacity: 1 }),
                  group([
                    animate('0.3s 0.2s ease-in-out',
                      style({ height: 0 })),
                    animate('0.3s ease-in-out',
                      style({ opacity: 0 }))
                  ])
                ]
              )
            ]
          ),
          trigger(
            'fade-in',
            [
              transition(
                ':enter',
                [
                  style({ opacity: 0 }),
                  animate('0.4s ease-in-out',
                    style({ opacity: 1 }))
                ]
              ),
            ]
          ),
    ]
}