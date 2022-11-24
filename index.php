<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <link rel="stylesheet" href="css/style.css?v=<?php echo uniqid(); ?>">

    <title>ChatBot</title>
  </head>
  <body>

    <section class="container-fluid bg-light">
        <div class="row">
            <div class="col-md-6 mx-auto p-0 bg-light">

                <div id="intro">
                    <div class="vh-100 bg-primary d-grid justify-content-center align-items-center p-lg-5 p-3">
                        <div class="card shadow-sm">
                            <div class="card-body py-5 px-4 text-center">
                                
                                <h5>Welcome!</h5>
                                <div class="mb-3">Please, enter your name and email address below to start a chat.</div>

                                <form id="startform" action="process.txt" method="POST">
                                    <div class="d-grid mb-3">
                                        <input type="text" name="name" class="form-control rounded-pill" placeholder="Name">
                                    </div>
                                    
                                    <div class="d-grid mb-5">
                                        <input type="email" name="email" class="form-control rounded-pill" placeholder="Email Address">
                                    </div>
                                    
                                    <div class="d-grid mb-3">
                                        <button type="submit" id="startbtn" class="btn btn-primary rounded-pill">Start Chat <i class="bi bi-send ms-1"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="chat" style="display: none;">
                    <div class="position-relative bg-light">
                        <div class="d-flex justify-content-between align-items-center bg-primary w-100" id="chathead">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="avatar border bg-light me-2">S</div>
                                <div class="d-grid ms-3 lead text-white">                                    
                                    <span>Support</span>
                                    <span style="display: none;" id="typing">Typing...</span>
                                </div>
                            </div>

                            <div>
                                <a href="#" class="btn" id="download">
                                    <i class="bi bi-download text-white"></i>
                                </a>
                            </div>
                        </div>

                        <div class="border bg-white w-100" id="chatbox">
                            
                        </div>

                        <div class="w-100 bg-light border" id="chatInput">
                            <div class="d-grid">
                                <input type="text" class="form-control rounded-pill">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <script src="js/index.js?v=<?php echo uniqid(); ?>" type="text/javascript"></script>
  </body>
</html>