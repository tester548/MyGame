import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("player", "sprites/Player.png")
loadSprite("bg", "sprites/Space.png")

// add a character to screen
scene("Menu", ({}) => {
          
  add([
    sprite("bg")
  ])
  const Menu = add([
    text("EscapeThis", {
      size: 72,
      width: 460,
    }),
    color(230, 250, 150),
    pos(75, 50),
    ])

            function addButton(txt, p, f) {

            const btn = add([
                text(txt),
                pos(p),
                area({ cursor: "pointer", }),
                scale(1),
                origin("center"),
            ])

            btn.onClick(f)

            btn.onUpdate(() => {
                if (btn.isHovering()) {
                    const t = time() * 10
                    btn.color = rgb(
                        wave(0, 255, t),
                        wave(0, 255, t + 2),
                        wave(0, 255, t + 4),
                    )
                    btn.scale = vec2(1.2)
                } else {
                    btn.scale = vec2(1)
                    btn.color = rgb()
                }
            })

            }
            addButton("Start", vec2(290, 250), () => go("Level1", {}));
            addButton("Developer", vec2(290, 350), () => go("Developer", {}));
            addButton("Quit", vec2(290, 450), () => debug.log("ok, bye"));
          
});

scene("Developer", ({}) => {

  function addButton(txt, p, f) {

            const btn = add([
                text(txt),
                pos(p),
                area({ cursor: "pointer", }),
                scale(1),
                origin("center"),
            ])

            btn.onClick(f)

            btn.onUpdate(() => {
                if (btn.isHovering()) {
                    const t = time() * 10
                    btn.color = rgb(
                        wave(0, 255, t),
                        wave(0, 255, t + 2),
                        wave(0, 255, t + 4),
                    )
                    btn.scale = vec2(1.2)
                } else {
                    btn.scale = vec2(1)
                    btn.color = rgb()
                }
            })

  }

  add([
    sprite("bg")
  ])
  add([
    text("MainDeveloper: StoneGame (nick)", {
      size: 60,
    }),
    pos(150,40),
  ])
  add([
    text("Sprite: PinTrest", {
      size: 60,
    }),
    pos(150,140),
  ])
  add([
    text("Musik: StoneGame (nick)", {
      size: 60,
    }),
    pos(150,240),
  ])
  addButton("Menu", vec2(290, 600), () => go("Menu", {}));
});

scene("Level1", ({point}) => {
  const SPEED = 320
  const JUMP_FORCE = 240
  gravity(640)

  
  const player = add([
    sprite("player"),
    pos(center()),
    area(),
    body(),
  ])
  onKeyDown("left", () => {
    player.move(-SPEED, 0)
  })

  onKeyDown("right", () => {
	  player.move(SPEED, 0)
  })

  onKeyPress("space", () => {
	if (player.isGrounded()) {
		  player.jump(JUMP_FORCE)
	  }
  })
  add([
	  rect(1500, 2000),
	  area(),
    color(85,85,85),
	  outline(1),
	  pos(0, 700),
	  solid(),
  ])

  player.onUpdate(() => {
	// Set the viewport center to player.pos
	  camPos(player.pos)
  })
})

go("Menu", {})