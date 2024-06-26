import { FoodCard } from "@/app/(routes)/dashboard/page";
import { Meal } from "@/types/meal";
import React, { useEffect, useState } from "react";

interface IFoodCardProps {
  macroType: string;
}
const TopFoodCards = ({ macroType }: IFoodCardProps) => {
  const [mealRes, setMealRes] = useState<object[]>();

  useEffect(() => {
    getMeals();
  }, []);

  const getMeals = async () => {
    try {
      const response = await fetch(
        `/auth/get-meals?email=${"jschuster8765@gmail.com"}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const newRes = data;
        console.log(newRes.meals.rows);
        setMealRes(newRes.meals.rows);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getTopThreeHighMacroMeals = (): object[] => {
    if (!mealRes) {
      return [];
    }

    if (macroType === "calories") {
      const sortedMeals = [...mealRes].sort(
        (a: any, b: any) => parseFloat(b.calories) - parseFloat(a.calories)
      );
      return sortedMeals.slice(0, 3);
    }
    if (macroType === "protein") {
      const sortedMeals = [...mealRes].sort(
        (a: any, b: any) => parseFloat(b.protein) - parseFloat(a.protein)
      );
      return sortedMeals.slice(0, 3);
    } else if (macroType === "carbs") {
      const sortedMeals = [...mealRes].sort(
        (a: any, b: any) => parseFloat(b.carbs) - parseFloat(a.carbs)
      );
      return sortedMeals.slice(0, 3);
    } else if (macroType === "fat") {
      const sortedMeals = [...mealRes].sort(
        (a: any, b: any) => parseFloat(b.fat) - parseFloat(a.fat)
      );
      return sortedMeals.slice(0, 3);
    } else if (macroType === "fiber") {
      const sortedMeals = [...mealRes].sort(
        (a: any, b: any) => parseFloat(b.fiber) - parseFloat(a.fiber)
      );
      return sortedMeals.slice(0, 3);
    } else if (macroType === "sugar") {
      const sortedMeals = [...mealRes].sort(
        (a: any, b: any) => parseFloat(b.sugar) - parseFloat(a.sugar)
      );
      return sortedMeals.slice(0, 3);
    } else {
      const sortedMeals: any[] = [];
      return sortedMeals;
    }
  };
  return (
    <div className="w-full">
      {getTopThreeHighMacroMeals().map((meal: Meal, index: number) => (
        <FoodCard key={index} meal={meal} />
      ))}
    </div>
  );
};

export default TopFoodCards;
