# Pro-Runner-Game

Abeshek is a pro gamer that has played and completed all the games available to him. His friend Aananth has now tasked you with creating a new game so he can get over his boredom.

To make sure he doesn’t complete it, Aananth wants you to create an infinite runner game with a wall and a ceiling. Clicking or pressing space will switch the gravity and the runner will move to the opposite wall.

The goal of the game is to survive the obstacles and increase his score.

Normal Mode:
- [x] For normal mode, the runner can be a simple square that keeps moving horizontally. The runner should move between the wall and ceiling on clicking/pressing space, i.e, if the runner is moving on the floor, it must move to the ceiling on click/space and stay there till next click/space.
- [x] Implement a points system based on distance travelled.
- [x] Add randomly appearing holes in the floor and ceiling. If the runner touches the hole, the game must end and the score must be displayed on the screen.
- [x] Save the highest score using local storage and display it.


Hacker Mode:
- [x] As the points increase, make the runner move faster and faster.
- [x] Use a vertically asymmetric runner (example: a triangle). When the gravity is switched, flip the player upside down as well.
- [x] Generate different shaped obstacles that move up and down on the screen. The game must end if the runner touches the obstacle.
- [x] Generate power ups on the map that activate abilities for sometime (example: slows down the game, grants invincibility, etc.)

Hackermode++:
- [x] Abeshek wants a unique experience every time he plays the game. So procedurally generate the map.
