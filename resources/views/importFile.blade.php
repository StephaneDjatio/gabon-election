@extends('layouts.app')

@section('content')
    @include('layouts.navbar')
    <div class="container mt-5">
        <div class="card m-auto" style="width: 50rem;">
            <div class="card-body">
                <h4 class="card-title text-center">Update Results</h4>
                <hr>
                <form action="{{ url('import') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group row">
                        <label for="load_file"  class="col-sm-3 col-form-label">Load file</label>
                        <div class="col-sm-9">
                            <input type="file" class="form-control" name="load_file" id="load_file">
                        </div>
                    </div>
                    <hr>
                    <div class="form-group text-center mt-3">
                          <button type="submit" class="btn btn-primary">Upload file</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
