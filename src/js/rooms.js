;
(function() {
    const checkCurrentPage = () => {
        let href = window.location.href;
        let rooms_pattern = 'rooms';
        if (href.match(rooms_pattern) !== null) {
            $('.leader_active').removeClass('active').removeClass('font-weight-bold');
            $('.score_active').removeClass('active').removeClass('font-weight-bold');
            $('.rooms_active').addClass('active').addClass('font-weight-bold');

            initRooms();
        }
    }

    const initRooms = () => {
        let request = {
            url: 'application/controller/open_games.php',
        };
        ajaxPromise(request)
            .then(res => {
                let rooms = res.split(/[\n]/);
                for (let room of rooms) {
                    let details = room.split(',');
                    let dom = (`<div class="col-sm-3">
			            			<div class="shadow mb-5 bg-white rounded">
			            				<div class="card bg-light">
			              					<div class="card-body">
			                					<p class="card-text">Player</p>
			                					<h5 class="card-title">${details[1]}</h5>
			                					<button class="join-game btn btn-outline-info" value="${details[0]}">JOIN</button>
			              					</div>
			            				</div>
			          				</div>
          						</div>`);
                    $('.room-cards').append(dom);
                }
            });
    }

    $('.new-game-btn').on('click', () => {
        let userId = cookie.get('userId');
        let request = {
            url: 'application/controller/new_game.php',
            data: {
                uId: userId
            }
        };
        ajaxPromise(request)
            .then(res => {
                if (res.match('ERROR') !== null) {
                    let dom = (`<div class="alert alert-warning alert-dismissible fade show" role="alert">
            							<strong>WARRNING</strong> Unable to start a game!
            								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
              										<span aria-hidden="true">&times;</span>
            								</button>
          							</div>`);
                    $('.new-game-alert').append(dom);
                } else {
                    self.location = `game.php?gameId=${res}`;
                }
            });
    });

    $(document).ready(() => {
        $('.join-game').on('click', (event) => {
            event = event || window.event;
            let gameId = event.target.value;
            let userId = cookie.get('userId');
            let request = {
                url: 'application/controller/join_game.php',
                data: {
                    uId: userId,
                    gId: gameId
                }
            };
            ajaxPromise(request)
                .then(res => {
                    if (res.match('ERROR') !== null || res == 0) {
                        console.log(res);
                        let dom = (`<div class="alert alert-warning alert-dismissible fade show" role="alert">
            							<strong>WARRNING</strong> Unable to join the game!
            								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
              										<span aria-hidden="true">&times;</span>
            								</button>
          							</div>`);
                        $('.new-game-alert').append(dom);
                    } else {
                        self.location = `game.php?gameId=${gameId}`;
                    }
                });
        });
    });
    checkCurrentPage();
})();