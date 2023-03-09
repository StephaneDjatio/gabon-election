<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ElectionResult extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
    protected $primaryKey = '[CODE_BV, parti_id]';
    protected $table = 'partis_politiques_bureaux_votes';

    protected $fillable = ['CODE_BV', 'parti_id', 'nb_votants'];
}
