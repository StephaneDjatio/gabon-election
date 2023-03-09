<nav class="navbar navbar-expand-sm navbar-light bg-light" aria-label="Third navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        Logo
        {{-- <img src="{{ asset('assets/images/cnamgs-logo.jpg') }}"
                            alt="login form" class="img-fluid" style="border-radius: .2rem 0 0 .2rem; width: 40%;" /> --}}
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          {{-- <li class="nav-item">
            <a class="nav-link {{ (request()->is('index')) ? 'active' : '' }}" aria-current="page" href="{{ url('index') }}">Carte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link {{ (request()->is('list')) ? 'active' : '' }}" href="{{ url('list') }}">Adhérants</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Notifications</a>
          </li> --}}
          {{-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> --}}
        </ul>
      </div>
    </div>
  </nav>
