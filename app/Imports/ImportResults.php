<?php

namespace App\Imports;

use App\Models\BureauVote;
use App\Models\ElectionResult;
use App\Models\Parti;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithChunkOffset;
use Maatwebsite\Excel\Concerns\WithBatchInserts;

class ImportResults implements ToCollection, WithHeadingRow, WithBatchInserts, WithChunkReading
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        // dd($collection);
        $partis_politiques = Parti::get();
        foreach ($collection as $key => $value) {

            $code_bv = $value['code_bv'];
            $total_inscrits = 0;
            $total_votants = 0;

            foreach ($partis_politiques as $parti) {

                $nb_votants = $value[$parti->id];

                $data = array(
                    'CODE_BV'        =>  $code_bv,
                    'parti_id'        =>  $parti->id,
                    'nb_votants'        =>  $nb_votants,
                );

                ElectionResult::create($data);

                $total_votants += $nb_votants;
            }

            $total_inscrits = $total_votants + $value['abstentions'] + $value['bulletins_blancs'];

            $data1 = array(
                'total_votants'        =>  $total_votants,
                'abstensions'        =>  $value['abstentions'],
                'bulletins_blancs'        =>  $value['bulletins_blancs'],
                'total_inscrits'        =>  $total_inscrits,
            );

            BureauVote::where('CODE_BV', $code_bv )->update($data1);


        }
    }

    public function batchSize(): int
    {
        return 1000;
    }

    public function chunkSize(): int
    {
        return 1000;
    }
}
