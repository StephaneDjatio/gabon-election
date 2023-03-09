<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DecoupageController extends Controller
{
    public function get_sieges_electoraux() {
        $query = "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(public.sieges_electoraux.*)::json)) AS geom
                FROM sieges_electoraux";

        $query_execute = DB::select($query);

        $query1 = 'SELECT sieges_electoraux.id_siege AS siege, nom_parti, couleur_parti, SUM(nb_votants) AS votants
        FROM partis_politiques_bureaux_votes, partis_politiques, sieges_electoraux, bureaux_votes
        WHERE partis_politiques.id = partis_politiques_bureaux_votes.parti_id
        AND partis_politiques_bureaux_votes."CODE_BV" = bureaux_votes."CODE_BV"
        AND sieges_electoraux.id_siege = bureaux_votes.id_siege
        GROUP BY sieges_electoraux.id_siege, nom_parti, couleur_parti';

        $query_execute1 = DB::select($query1);

        $query2 = 'SELECT id_siege, SUM(total_votants) AS votants, SUM(total_inscrits) AS inscrits, SUM(abstensions) AS abstensions, SUM(bulletins_blancs) AS bulletins_blancs
        FROM bureaux_votes
        GROUP BY id_siege';

        $query_execute2 = DB::select($query2);

        $data['sieges_electoraux'] = $query_execute;
        $data['votants'] = $query_execute1;
        $data['total'] = $query_execute2;

        return $data;
    }

    public function get_bureaux_votes() {
        // $query = "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(public.bureaux_votes.*)::json)) AS geom
        //         FROM bureaux_votes";

        $query = "SELECT json_build_object('type', 'FeatureCollection', 'features',
        json_agg(
            json_build_object(
                'type'      , 'Feature',
                'geometry'  , ST_AsGeoJSON(bureaux_votes.geom)::json,
                'properties', json_build_object(
                    'bureau_vote', bureaux_votes.nom,
                    'total_votants', bureaux_votes.total_votants,
                    'total_inscrits', bureaux_votes.total_inscrits,
                    'abstensions', bureaux_votes.abstensions,
                    'bulletins_blancs', bureaux_votes.bulletins_blancs,
                    'code_bv', bureaux_votes.".'"CODE_BV"'."
                )))) AS geom
        FROM bureaux_votes";

        $query_execute = DB::select($query);

        $query1 = 'SELECT "CODE_BV" AS code_bureau, nom_parti, couleur_parti, SUM(nb_votants) AS votants
        FROM partis_politiques_bureaux_votes, partis_politiques
        WHERE partis_politiques.id = partis_politiques_bureaux_votes.parti_id
        GROUP BY "CODE_BV", nom_parti, couleur_parti';

        $query_execute1 = DB::select($query1);

        $data['bureaux_votes'] = $query_execute;
        $data['votants'] = $query_execute1;

        return $data;
    }

    public function get_decoupages_electoraux() {
        $query = "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(public.decoupages_electorales.*)::json)) AS geom
                FROM decoupages_electorales";

        $query_execute = DB::select($query);

        $query1 = 'SELECT sieges_electoraux.decoupage AS decoupage, nom_parti, couleur_parti, SUM(nb_votants) AS votants
        FROM partis_politiques_bureaux_votes, partis_politiques, sieges_electoraux, bureaux_votes, decoupages_electorales
        WHERE partis_politiques.id = partis_politiques_bureaux_votes.parti_id
        AND partis_politiques_bureaux_votes."CODE_BV" = bureaux_votes."CODE_BV"
        AND sieges_electoraux.id_siege = bureaux_votes.id_siege
        AND sieges_electoraux.decoupage = decoupages_electorales.decoupage
        GROUP BY sieges_electoraux.decoupage, nom_parti, couleur_parti';

        $query_execute1 = DB::select($query1);

        $query2 = 'SELECT sieges_electoraux.decoupage, SUM(total_votants) AS votants, SUM(total_inscrits) AS inscrits, SUM(abstensions) AS abstensions, SUM(bulletins_blancs) AS bulletins_blancs
        FROM bureaux_votes, sieges_electoraux, decoupages_electorales
        WHERE sieges_electoraux.id_siege = bureaux_votes.id_siege
        AND sieges_electoraux.decoupage = decoupages_electorales.decoupage
        GROUP BY sieges_electoraux.decoupage';

        $query_execute2 = DB::select($query2);


        $data['decoupages_electoraux'] = $query_execute;
        $data['votants'] = $query_execute1;
        $data['total'] = $query_execute2;

        return $data;
    }
}
