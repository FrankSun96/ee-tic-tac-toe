<?php 
	include('application/view/layouts/head.php');
	include('application/view/layouts/header.php');
?>
<div class="container wrapper">
  <div class="score-board-error"></div>
	<div class="shadow-lg mb-5 bg-white rounded board-table">
		<table class="table table-striped">
  			<thead>
    			<tr>
      				<th scope="col"></th>
      				<th scope="col">MY STATISTICS</th>
    			</tr>
  			</thead>
  			<tbody>
    			<tr>
      				<th scope="row">WINS</th>
      				<td class="win" >0</td>
    			</tr>
    			<tr>
      				<th scope="row">LOSE</th>
      				<td class="lose">0</td>
    			</tr>
    			<tr>
      				<th scope="row">DRAWS</th>
      				<td class="draw">0</td>
    			</tr>
  			</tbody>
		</table>
	</div>
</div>
<?php include('application/view/layouts/footer.php');?>