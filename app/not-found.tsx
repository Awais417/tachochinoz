import { Metadata } from "next";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <section className="bg-blue h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="font-potta-one text-white text-5xl">Page not found</h1>
        <p className="text-white font-jost mb-6">
          This page doesn't exist, please go back to homepage.
        </p>

        <Link
          href={"/"}
          className="font-jomhuria text-3xl bg-red text-white px-4 pt-3 pb-2 rounded-full hover:bg-red/50 transition-colors duration-300 ease-in"
        >
          Go back to homepage
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
