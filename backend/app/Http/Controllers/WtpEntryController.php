<?php
namespace App\Http\Controllers;

use App\Models\WtpEntry;
use Illuminate\Http\Request;

class WtpEntryController extends Controller
{
    public function index(Request $request)
    {
        $wtp = $request->query('wtp');
        $q = WtpEntry::query()->orderBy('date','desc');
        if ($wtp) $q->where('wtp',$wtp);
        return $q->paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'wtp' => 'required|in:kerenceng,cidanau',
            'flowmeter' => 'array',
            'chemicals' => 'array',
            'electricity' => 'array',
            'quality' => 'array',
            'durations' => 'array',
            'pressure' => 'array',
            'filters' => 'array'
        ]);
        $entry = WtpEntry::updateOrCreate(
            ['date'=>$data['date'],'wtp'=>$data['wtp']],
            $data
        );
        return response()->json($entry, 201);
    }

    public function show(WtpEntry $entry)
    {
        return $entry;
    }

    public function update(Request $request, WtpEntry $entry)
    {
        $entry->update($request->all());
        return $entry;
    }

    public function destroy(WtpEntry $entry)
    {
        $entry->delete();
        return response()->noContent();
    }

    public function byDate(string $date, string $wtp)
    {
        $entry = WtpEntry::whereDate('date',$date)->where('wtp',$wtp)->first();
        return $entry ?? response()->json(['message'=>'Not found'],404);
    }
}
