<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/get_sieges_electoraux', 'App\Http\Controllers\DecoupageController@get_sieges_electoraux');
Route::get('/get_bureaux_votes', 'App\Http\Controllers\DecoupageController@get_bureaux_votes');
Route::get('/get_decoupages_electoraux', 'App\Http\Controllers\DecoupageController@get_decoupages_electoraux');

Route::get('/importExport', 'App\Http\Controllers\ImportExportController@importExport');
Route::post('/import', 'App\Http\Controllers\ImportExportController@import');
