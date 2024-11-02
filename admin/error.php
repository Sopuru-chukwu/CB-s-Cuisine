<?php if (isset($_SESSION['error'])) :?>
  <div style="margin-left: 10%;" class="alert alert-success red-text" role="alert">
      <?php echo $_SESSION['error'];
           unset($_SESSION['error']);
      ?>
      
  </div>
  <?php endif?>