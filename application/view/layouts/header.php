<nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="index.php">Tic Tac Toe</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href=""><span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item login-allowed score_active" hidden="true">
                <a class="nav-link" href="score_board.php">Score Board</a>
            </li>
            <li class="nav-item login-allowed Leader_active" hidden="true">
                <a class="nav-link" href="leader_board.php">Leader Board</a>
            </li>
            <li class="nav-item login-allowed rooms_active" hidden="true">
                <a class="nav-link" href="rooms.php">Rooms</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <div class="login-allowed">
                <label class="welcome"></label>
            </div>
            <div class="login-disappear" hidden>
                <a href="register.php"><button class="btn btn-outline-primary my-2 my-sm-0 btn-sm" type="button" >Register</button></a>
                <a href="login.php"><button class="btn btn-outline-primary my-2 my-sm-0 btn-sm login-btm" type="button">Login</button></a>
            </div>
        </form>
    </div>
</nav>