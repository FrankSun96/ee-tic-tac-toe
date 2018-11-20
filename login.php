<?php 
	include('application/view/layouts/head.php');
	include('application/view/layouts/header.php');
?>
<div class="container wrapper">
	<div class="shadow-lg mb-5 bg-white rounded login-card">
		<div class="card">
		  <h5 class="card-header">Login</h5>
		  <div class="card-body">
		    <form id="login-form">
					<div class="form-group">
					    <label for="username">Username</label>
					    <input name="username" type="text" class="form-control" id="username" placeholder="Username">
					    <div class="alert alert-warning login-alert" role="alert" hidden="">
  							Please input your username !
							</div>
					</div>
					<div class="form-group">
					    <label for="password">Password</label>
					    <input name="password" type="password" class="form-control" id="password" placeholder="Password">
					    <div class="alert alert-warning login-alert" role="alert" hidden="hidden">
  							Please input your password !
							</div>
					</div>
					<div class="alert alert-danger login-alert" role="alert" hidden="hidden">
  					wrong username or password ! 
					</div>
					<button type="button" class="btn btn-outline-primary login-btn">Login</button>
					<a href="register.php"><button class="btn btn-outline-primary" type="button">Register</button></a>
				</form>
	  	</div>
		</div>
	</div>
</div>
 <?php include('application/view/layouts/footer.php');?>