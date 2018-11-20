<?php 
	include('application/view/layouts/head.php');
	include('application/view/layouts/header.php');
?>
<div class="container wrapper">
	<div class="leader-board-error"></div>
	<div class="shadow-lg mb-5 bg-white rounded board-table">
		<table class="table table-striped leader_board">
		  <thead>
		    <tr>
		      <th scope="col">Username</th>
		      <th scope="col">Wins</th>
		      <th scope="col">Loses</th>
		      <th scope="col">Draws</th>
		    </tr>
		  </thead>
		  <tbody>
		  </tbody>
	</table>
	</div>
</div>
<?php include('application/view/layouts/footer.php');?>