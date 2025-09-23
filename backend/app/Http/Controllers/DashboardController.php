<?php
namespace App\Http\Controllers;

use App\Models\WtpEntry;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function show(string $date)
    {
        $today = Carbon::parse($date)->toDateString();
        $yesterday = Carbon::parse($date)->subDay()->toDateString();

        $todayEntries = WtpEntry::whereDate('date',$today)->get()->keyBy('wtp');
        $yEntries     = WtpEntry::whereDate('date',$yesterday)->get()->keyBy('wtp');

        $result = [
            'date' => $today,
            'flowmeter' => [],
            'chemicals' => [],
            'electricity' => [],
        ];

        foreach (['kerenceng','cidanau'] as $wtp) {
            $t = $todayEntries[$wtp] ?? null;
            $y = $yEntries[$wtp] ?? null;

            $flowT = ($t?->flowmeter) ?? [];
            $flowY = ($y?->flowmeter) ?? [];
            $flowDiff = [];
            foreach ($flowT as $k => $v) {
                $flowDiff[$k] = (float)($v ?? 0) - (float)($flowY[$k] ?? 0);
            }

            $elecT = ($t?->electricity) ?? [];
            $elecY = ($y?->electricity) ?? [];
            $elecDiff = [];
            foreach ($elecT as $k => $v) {
                $elecDiff[$k] = (float)($v ?? 0) - (float)($elecY[$k] ?? 0);
            }

            $chem = ($t?->chemicals) ?? [];

            $result['flowmeter'][$wtp] = $flowDiff;
            $result['electricity'][$wtp] = $elecDiff;
            $result['chemicals'][$wtp] = $chem;
        }

        return response()->json($result);
    }
}
