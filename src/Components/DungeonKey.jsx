import React from 'react';
import Cell from "./Cell";

const DungeonKey = () => (
    <div className="combatLog dungeonKey">
        <ul>
            <li>
                <Cell row="key" col="key" type="player" />
                player
            </li>
            <li>
                <Cell row="key" col="key" type="health" />
                health
            </li>
            <li>
                <Cell row="key" col="key" type="enemy" />
                enemy
            </li>
            <li>
                <Cell row="key" col="key" type="weapon" />
                weapon
            </li>
            <li>
                <Cell row="key" col="key" type="boss" />
                boss
            </li>
            <li>
                <Cell row="key" col="key" type="portal" />
                portal
            </li>
            <li>
                <Cell row="key" col="key" type="floor" />
                floor
            </li>
            <li>
                <Cell row="key" col="key" type="wall" />
                wall
            </li>
            <li>
                <Cell row="key" col="key" type="dungeonMap" />
                dungeon map
            </li>
        </ul>
    </div>
)

export default DungeonKey;