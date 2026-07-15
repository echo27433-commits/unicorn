"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { WorkCase } from "../lib/work";

const ACCENT = "#ff5f28";
const GRID = "rgba(255,255,255,0.08)";
const TICK = "rgba(255,255,255,0.45)";

type Growth = WorkCase["growth"];

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  unit: string;
}) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  const display =
    unit === "min"
      ? `${value} min`
      : unit === "K"
        ? `${value}K`
        : String(value);

  return (
    <div className="rounded-lg border border-white/15 bg-black/90 px-3 py-2 text-sm text-white shadow-lg">
      <p className="text-white/50">{label}</p>
      <p className="mt-0.5 font-medium text-[#ff5f28]">{display}</p>
    </div>
  );
}

export default function WorkGrowthChart({ growth }: { growth: Growth }) {
  const data = growth.points.map((p) => ({
    name: p.label,
    value: p.numeric,
    display: p.value,
  }));

  if (growth.chartType === "bars") {
    return (
      <div className="mt-10 h-[18rem] w-full md:h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 8, left: 0, bottom: 8 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: TICK, fontSize: 12 }}
              axisLine={{ stroke: GRID }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: TICK, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v} ${growth.unit}`}
              width={56}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={<ChartTooltip unit={growth.unit} />}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={96}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={index === 0 ? "rgba(255,255,255,0.28)" : ACCENT}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="mt-10 h-[18rem] w-full md:h-[22rem]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 12, right: 12, left: 0, bottom: 8 }}
        >
          <defs>
            <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.45} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: TICK, fontSize: 11 }}
            axisLine={{ stroke: GRID }}
            tickLine={false}
            interval={0}
            angle={data.length > 4 ? -18 : 0}
            textAnchor={data.length > 4 ? "end" : "middle"}
            height={data.length > 4 ? 54 : 36}
          />
          <YAxis
            tick={{ fill: TICK, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}${growth.unit}`}
            width={44}
          />
          <Tooltip content={<ChartTooltip unit={growth.unit} />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={ACCENT}
            strokeWidth={2.5}
            fill="url(#growthFill)"
            dot={{ r: 4, fill: ACCENT, stroke: "#000", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: ACCENT, stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
