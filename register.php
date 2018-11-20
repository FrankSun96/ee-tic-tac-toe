<?php 
	include('application/view/layouts/head.php');
	include('application/view/layouts/header.php');
?>
<div class="container wrapper">
	<div class="shadow-lg mb-5 bg-white rounded login-card">
	<div class="card">
	  <h5 class="card-header">Register</h5>
	  <div class="card-body">
	    <form id="register-form">
				<div class="form-group">
				    <label for="username">Username</label>
				    <input name="username" type="text" class="form-control" id="username" placeholder="Username">
				    <div class="alert alert-warning register-alert" role="alert" hidden="">
  						Please input your username !
					</div>
				</div>
				<div class="form-group">
				    <label for="password">Password</label>
				    <input name="password" type="password" class="form-control" id="password" placeholder="Password">
				    <div class="alert alert-warning register-alert" role="alert" hidden="">
  						Please input your password !
					</div>
				</div>
				<div class="form-group">
				    <label for="name">Name</label>
				    <input name="name" type="text" class="form-control" id="name" placeholder="Name">
				    <div class="alert alert-warning register-alert" role="alert" hidden="">
  						Please input your name !
					</div>
				</div>
				<div class="form-group">
				    <label for="surname">Surname</label>
				    <input name="surname" type="text" class="form-control" id="surname" placeholder="Surname">
				    <div class="alert alert-warning register-alert" role="alert" hidden="">
  						Please input your surname !
					</div>
				</div>
				<div class="alert alert-danger register-warning" role="alert" hidden="hidden">
				</div>
				<button type="button" class="btn btn-outline-primary register-btn">Register</button>
			</form>
  	</div>
	</div>
	</div>
</div>
 <?php include('application/view/layouts/footer.php');?>