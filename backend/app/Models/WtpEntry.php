<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WtpEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'date','wtp','flowmeter','chemicals','electricity','quality','durations','pressure','filters'
    ];

    protected $casts = [
        'date' => 'date',
        'flowmeter' => 'array',
        'chemicals' => 'array',
        'electricity' => 'array',
        'quality' => 'array',
        'durations' => 'array',
        'pressure' => 'array',
        'filters' => 'array',
    ];
}
