import { useEffect, useState } from "react";
import {
    AreaChart, Area,
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { API_BASE } from "@/constants/api";

function Statisctics() {
    const [isLoading, setIsLoading] = useState([true])
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [range, setRange] = useState("7d");

    useEffect(() => {
        fetch(`${API_BASE}/chart`)
            .then(res => res.json())
            .then((res) => {
                setData(res);
                setIsLoading(false); // hanya stop loading kalau data sudah di-set
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false); // kalau error juga stop loading
            });
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        let startDate;

        if (range === "7d") {
            startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10);
            setFiltered(data.filter(d => d.date >= startDate));
        } else if (range === "30d") {
            startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10);
            setFiltered(data.filter(d => d.date >= startDate));
        } else {
            setFiltered(data);
        }
    }, [data, range]);

    if (isLoading) {
        return <p className="text-gray-500 text-center">Loading chart data...</p>;
    }

    if (!filtered || filtered.length === 0) {
        return <p className="text-gray-500 text-center">No chart data available</p>;
    }

    return (
        <section className="w-full border-b border-border backdrop-blur-md p-6">
            <div className="max-w-[1200px] mx-auto">
                {/* Filter Range */}
                <div className="flex gap-2 mb-6 justify-center">
                    <Button variant={range === "7d" ? "default" : "outline"} onClick={() => setRange("7d")}>7 Days</Button>
                    <Button variant={range === "30d" ? "default" : "outline"} onClick={() => setRange("30d")}>30 Days</Button>
                    <Button variant={range === "all" ? "default" : "outline"} onClick={() => setRange("all")}>All Time</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Daily Transactions */}
                    <Card className="p-4">
                        <h2 className="font-medium mb-2">Daily Transactions</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="dailyTx" fill="#8884d8" name="Tx/day" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Total Transactions */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Total Transactions</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="cumulativeTx" fill="#8884d8" name="Total Tx" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Daily Accounts */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Daily Active Accounts</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="dailyActiveAccounts" fill="#8884d8" name="Accounts/day" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Total Accounts */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Total Active Accounts</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="totalActiveAccounts" fill="#8884d8" name="Accounts Total" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Daily Games */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Daily Active Games</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="dailyActiveGames" fill="#8884d8" name="Games/day" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Total Games */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Total Active Games</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="totalActiveGames" fill="#8884d8" name="Games Total" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Daily Score */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Daily Score</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="dailyScore" fill="#8884d8" name="Score/day" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Total Score */}
                    <Card className="p-4">
                        <h3 className="font-medium mb-2">Total Score</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="totalScore" fill="#8884d8" name="Score Total" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default Statisctics;
