<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('created_at','desc')->paginate(12);
        return $this->responseSuccess("Posts", $posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $responseMessage = '';
        try {
            $post = new Post;
            $post->post_title = $request->post_title;
            $post->post_content = $request->post_content;
            $post->post_image_thumbnail = $request->post_image_thumbnail;
            $post->save();

            $responseMessage = 'Post Saved';
            return $this->responseSuccess($responseMessage, $post);
        } catch (\Throwable $th) {
            $responseMessage = 'Post Fail!';
            return $this->responseFail($responseMessage, null);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $responseMessage = '';
        try {
            $post->post_title = $request->post_title;
            $post->post_content = $request->post_content;
            $post->post_image_thumbnail = $request->post_image_thumbnail;
            $post->save();

            $responseMessage = 'Post Saved';
            return $this->responseSuccess($responseMessage, $post);
        } catch (\Throwable $th) {
            $responseMessage = 'Post Fail!';
            return $this->responseFail($responseMessage, null);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
