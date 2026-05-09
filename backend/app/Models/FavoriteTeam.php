<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteTeam extends Model
{
    protected $fillable = [
        'user_id',
        'team_id',
        'team_name',
        'team_logo',
    ];
}
