import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import usePreferencesStore from './stores/preferencesStore';
import { Input } from "@nextui-org/input";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import goalConsts from './consts/goalConsts.json'

function App() {

  const height = usePreferencesStore.use.height();
  const weight = usePreferencesStore.use.weight();
  const goal = usePreferencesStore.use.goal();

  const updateGoal = usePreferencesStore.use.updateGoal();
  const updateHeight = usePreferencesStore.use.updateHeight();
  const updateWeight = usePreferencesStore.use.updateWeight();

  const [isLoading, setIsLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<any>();

  console.log(workoutPlan)

  const GetWorkout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/workout', {
        params: {
          goal: goalConsts.goals[parseInt(goal)],
          weight: weight,
          height: height
        }
      });
      setWorkoutPlan(response.data.WeekPlan);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
            </div>
            <div className="flex lg:hidden">
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">

            </div>
          </nav>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-500 to-[#ffffff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl pt-36">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">

                Achieve Your Fitness Goals with FitGenie{' '}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                <span className=' italic text-red-500'>FitGenie</span> AI-Powered Personalized Fitness Plans
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Transform Your Fitness Journey with Custom AI-Designed Workouts
              </p>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className='my-container flex flex-row mx-auto justify-center items-center gap-8 py-6'>

            <div className='flex flex-col items-center justify-center'>
              <div className=' text-lg font-semibold'>🎯 Select Your Goal</div>
              <Select
                variant="bordered"
                endContent={false}
                onChange={(e) => { updateGoal(e.target.value); }}
                defaultSelectedKeys={goalConsts.goals[0]}
                value={goal}
                startContent={false}
                classNames={{
                  mainWrapper: "w-fit flex flex-row border-[1px] border-black min-w-[200px] h-12 text-black",
                  innerWrapper: "w-fit flex flex-row py-4 text-black",
                  selectorIcon: "text-gray-400 relative hidden text-black",

                  value: "flex flex-row w-full",
                  listboxWrapper: "border-2 flex flex-col items-center justify-center"
                }}
              >
                {
                  goalConsts.goals.map((goalConst, index) => {
                    return (
                      <SelectItem key={index} value={goalConst} className='w-fit'>
                        {goalConst}
                      </SelectItem>
                    )
                  })
                }

              </Select>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <div className='text-lg font-semibold'>⚖️ How much do you weight?</div>
              <Input
                value={weight}
                placeholder='80kg'
                classNames={{
                  mainWrapper: "w-fit flex flex-row border-[1px] border-black min-w-[250px] h-12 text-black",
                  innerWrapper: "w-fit flex flex-row py-4 text-black",
                  input: "outline-none",
                }}
                onChange={(e) => { updateWeight(e.target.value); }}
              />
            </div>

            <div className=' flex flex-col items-center justify-center'>
              <div className='text-lg font-semibold'>📏 How tall are you?</div>
              <Input
                className='outline-none'
                placeholder='180cm'
                classNames={{
                  mainWrapper: "w-fit flex flex-row border-[1px] border-black min-w-[150px] h-12 text-black",
                  innerWrapper: "w-fit flex flex-row py-4 text-black outline-none",
                  inputWrapper: "outline-none",
                  input: "outline-none",
                }}
                value={height}
                onChange={(e) => { updateHeight(e.target.value); }}
              />
            </div>
          </div>
          <div className='py-10'>
            <Button
              onClick={() => GetWorkout()}
              className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              I want my dream body 🔥
            </Button>
          </div>
          <div>
            {workoutPlan && (
              <div className="workout-plan grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                {workoutPlan.map((day: any, index: number) => (
                  <div key={index} className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Day {index + 1}: {day[`Day${index + 1}`].Focus}</h2>
                    <ul className="space-y-2">
                      {day[`Day${index + 1}`].Exercises.map((exercise: any, i: number) => (
                        <li key={i} className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">{exercise.Name}</h3>
                            <p className="text-sm text-gray-600">{exercise.Sets} sets x {exercise.Reps} reps</p>
                          </div>
                          <span className="text-sm text-gray-600">{exercise.Weight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
