<?php if (isset($_SESSION['success'])) :?>
  <div style="margin-left: 10%;" class="alert alert-success green-text" role="alert">
      <?php echo $_SESSION['success'];
           unset($_SESSION['success']);
      ?>
      
  </div>
  <?php endif?>