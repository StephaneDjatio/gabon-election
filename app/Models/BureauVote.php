<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BureauVote extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'bureaux_votes';

    protected $fillable = ['total_votants', 'abstensions', 'bulletins_blancs', 'total_inscrits'];
}
