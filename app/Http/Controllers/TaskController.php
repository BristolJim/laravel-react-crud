<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param Task $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, Task $task): \Illuminate\Http\JsonResponse
    {
        $allTasks = $task->whereIn('user_id', $request->user())->with('user');
        $tasks = $allTasks->orderBy('created_at', 'desc')->take(20)->get();

        return response()->json([
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(): ?\Illuminate\Http\Response
    {
        return response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $task = $request->user()->tasks()->create([
           'name' => $request->name,
        ]);

        return response()->json(Task::with('user')->find($task->id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): ?\Illuminate\Http\Response
    {
        return response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id): ?\Illuminate\Http\JsonResponse
    {
        $task = Task::findOrFail($id);
        return response()->json([
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id): ?\Illuminate\Http\JsonResponse
    {
        $input = $request->all();
        $task = Task::findOrFail($id);
        $task->update($input);

        return response()->json(Task::with('user')->find($task->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response|null
     * @throws \Exception
     */
    public function destroy($id): ?\Illuminate\Http\Response
    {
        Task::findOrFail($id)->delete();

        return null;
    }
}
