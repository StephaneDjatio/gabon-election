<?php

namespace App\Http\Controllers;

use App\Exports\ExportResults;
use App\Imports\ImportResults;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ImportExportController extends Controller
{
    public function importExport()
    {
       return view('importFile');
    }

    public function export()
    {
        return Excel::download(new ExportResults, 'users.xlsx');
    }

    public function import(Request $request)
    {
        Excel::import(new ImportResults, $request->file('load_file'));

        return back();
    }
}
