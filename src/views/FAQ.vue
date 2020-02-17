<template>
    <div id="FAQ">
        <div>
            <p>Getting Started</p>
            <ol>
                <li>
                    Go to the Classes page, fill out your character information, and save.
                    <ol>
                        <li class="sublist">
                            You can choose to auto-fill every character to a certain level, i.e. 
                            all level 200s or 250s or you can type in the level by their name. Eligible
                            legion characters are from 60-275.
                        </li>
                    </ol>
                </li>
                <li>
                    Once you've finished, head over to the grid page. From there, you'll have a similar
                    experience as the legion board in-game.
                    <ol>
                        <li class="sublist">Drag and drop pieces onto the board.</li>
                        <li class="sublist">Rotate pieces before or after they've been placed on the board.</li>
                        <li class="sublist">
                            If a piece is on the board, clicking on its icon will automatically scroll to its character card.
                            From there, you can freely rotate the pieces as long as the card is still highlighted.
                        </li>
                        <li class="sublist">Right click a piece's icon to remove it from the board.</li>
                    </ol>
                </li>
                <li>
                    If you wish to reassign the inner stat positions (STR, DEX, INT, LUK, etc), click on the Assign
                    button. If the stats start moving, you are able to drag and drop them to their new positions.
                </li>
                <li>
                    Do remember to save often. Refreshing the page will undo all progress made!
                </li>
            </ol>
        </div>

        <div>
            <p>FAQ</p>
            <ol>
                <li>
                    <strong>
                        Something went wrong. What should I do ?
                    </strong>
                    <ol>
                        <li class="sublist">Refresh the page. It'll likely solve most of your issues.</li>
                    </ol>
                </li>
                <li>
                    A piece is on the board yet I am able to add a duplicate. What is going on?
                    <ol>
                        <li class="sublist">
                            The server can be slow sometimes and your preset might not be fetched correctly.
                            In this case, just refresh the page.
                        </li>
                        <li class="sublist">
                            If you have already added the duplicate piece to the board, just remove it and save.
                            If you added the duplicate to the board and haven't saved, just refresh the page.
                        </li>
                    </ol>
                </li>
                <li>
                    When I change my character's level in the Classes page, why doesn't the character's shape get 
                    updated on the grid?
                    <ol>
                        <li class="sublist">
                            The grid uses a preset list which houses the positions and informaton (coordinates, level, etc) of each character. These
                            coordinates help create the piece's shape on the board. When changing a character's level, these coordinates
                            <strong>ARE NOT CHANGED</strong> in the preset list, thus its shape is not updated.
                            </li>
                        <li class="sublist">
                            The way to fix this issue is to remove the piece from the grid by right clicking on its icon,
                            saving the preset, then refreshing the page.
                        </li>
                    </ol>
                </li>
                <li>
                    What does #22FF22 mean in the Options page?
                    <ol>
                        <li class="sublist">
                            This is a hexadecimal number that represents a color. Every 2 digits represents
                            the amount of red, green, or blue needed to create that color. For example, for a purely
                            red color, the code would be #FF0000 (all red, no green, no blue).
                        </li>
                        <li class="sublist">
                            You can use 
                            <a href="https://www.color-hex.com">this link</a>
                            to find color palettes to use for the grid and pieces.
                        </li>
                    </ol>
                </li>
                <li>
                    How does the grid work?
                    <ol>
                        <li class="sublist">
                            The grid is made up of two 2D matrices stacked on top of each other. The topmost
                            grid contains the legion pieces and is transparent while the bottom contains the 
                            stats and styling. The Assign button switches their orientation.
                        </li>
                    </ol>
                </li>
                <li>
                    How does drag and drop work?
                    <ol>
                        <li class="sublist">
                            Initially, each piece would be inserted into a cell when placed on the grid. However, 
                            when the pieces were placed by the edges, some portions of it would be hanging off the grid.
                            What I decided to do instead was render the icon inside the cell and fill adjacent cells with 
                            the piece's color. This mimics the drag and drop behavior of the legion board but the actual
                            piece never moves from its container.
                        </li>
                    </ol>
                </li>
                <li>
                    How do the pieces work?
                    <ol>
                        <li class="sublist">
                            Similar to the grid, the pieces are a 5x5 2D matrix. Each character's icon is placed in the middle
                            at position (2, 2). Using a list of coordinates relative to the middle, I was able to recreate their shapes
                            according to their archetypes (warrior, magician, bowman, etc). 
                        </li>
                        <li class="sublist">
                            For example, an SSS rank Warrior would have these relative coordinates: (1, 0), (0, 1), (1, 1), (2, 0). 
                            For each coordinate, just add the middle position with these coordinates so (2, 2) + (1, 0) = (3, 0) to get
                            the adjacent cell position.
                        </li>
                    </ol>
                </li>
                <li>
                    How do the rotations work?
                    <ol>
                        <li class="sublist">
                            The pieces rotate with respect to the middle icon. Thanks to the list of relative coordinates,
                            rotating the pieces was quite easy. Depending on the rotation, all I had to do was recalculate the coordinates
                            and color the new adjacent cell positions in.
                        </li>
                        <li class="sublist">90º rotations: (x, y) &#8594; (-y, x) </li>
                        <li class="sublist">-90º rotations: (x, y) &#8594; (y, -x)</li>
                        <li class="sublist">Mirror over X-axis: (x, y) &#8594; (x, -y)</li>
                        <li class="sublist">Mirror over Y-axis: (x, y) &#8594; (-x, y)</li>
                    </ol>
                </li>
                <li>
                    Where did you get the legion information from?
                    <ol>
                        <li class="sublist">
                            The
                            <a href="https://dexless.com/guides/legion-guide.154/">legion guide</a> 
                            written by Jushi that was published on dexless.com. This resource was invaluable
                            for legion ranks, and character effects and shapes.
                        </li>
                        <li class="sublist">
                            I also used
                            <a href="https://ayumilove.net/maplestory-maple-union-guide">Ayumilove's site</a>
                            for supplemental information and for some skill icons as well.
                        </li>
                        <li class="sublist">
                            <a href="https://www.youtube.com/watch?v=OYL7NNsgymU">KyoWantsCute's legion video.</a>
                            I didn't realize that Xenon had its own SSS legion shape (a combination of pirate's and thief's) so
                            shout out to them for that info.
                        </li>
                        <li class="sublist">
                            <a href="https://orangemushroom.net/">Orange Mushroom's Blog</a> for extra info and for
                            snagging skill icons.
                        </li>
                    </ol>
                </li>
                <li>
                    Where did you get the icons and cursors from?
                    <ol>
                        <!-- <li class="sublist">
                            Icons from the
                            <a href="https://thenounproject.com/">Noun Project</a>.
                        </li> -->
                        <li class="sublist">
                           Mirror Horizontally by Ben Davis from the
                           <a href="https://thenounproject.com/icon/320170/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           Mirror Vertically by Ben Davis from the
                           <a href="https://thenounproject.com/icon/320171/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           Rotate by sevgenjory from the
                           <a href="https://thenounproject.com/icon/1543478/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           Rotate by Sergey Demushkin from the
                           <a href="https://thenounproject.com/icon/479739/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           Sword Dual by João Filipe F. Rocha from the
                           <a href="https://thenounproject.com/icon/1586413/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           options by Thengakola from the
                           <a href="https://thenounproject.com/icon/866115/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           grid by Numero Uno from the
                           <a href="https://thenounproject.com/icon/933325/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           overlap by ProSymbols from the
                           <a href="https://thenounproject.com/icon/585574/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           FAQ by BomSymbols from the
                           <a href="https://thenounproject.com/icon/1140958/">Noun Project</a>
                        </li>
                        <li class="sublist">
                           Log Out by b farias from the
                           <a href="https://thenounproject.com/icon/1644657/">Noun Project</a>
                        </li>
                        <li class="sublist">
                            Cursors from 
                            <a href="http://www.rw-designer.com/cursor-set/original-maplestory-white">RealWorld Graphics</a>
                        </li>
                    </ol>
                </li>
                <li>
                    What technologies did you use?
                    <ol>
                        <li class="sublist">Vue, SCSS, Node, Express, PostgresQL</li>
                        <li class="sublist">Deployed frontend to Netlify and backend to Heroku.</li>
                    </ol>
                </li>
                <li>
                    Github?
                    <ol>
                        <li class="sublist">
                            <a href="https://github.com/SotaSamson96/Legion">Yessir</a>
                        </li>
                    </ol>
                </li>
                <li>
                    Will you be adding new features?
                    <ol>
                        <li class="sublist">
                            Maybe. I might add the ability to change each character piece's icons.
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    name: "FAQ"
}
</script>

<style scoped lang="scss">
    @import '../mixins.scss';

    #FAQ {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        > div {
            padding: 0px 5px;
            > p {
                font-size: 3em;
                color: yellow;
                border-bottom: 3px solid white;
            }
            > ol {
                margin-left: 20px;
                margin-bottom: 10px;
                font-size: 1.75em;
                line-height: 2;
                list-style: {
                    position: inside;
                    type: upper-roman;
                    type: decimal;
                }
                > li {
                    font-weight: 200;
                    color: yellow;
                }
            }
        }
    }

    .sublist {
        margin-left: 40px;
        font-size: 0.75em;
        color: white;
        list-style: {
            position: inside;
            type: lower-alpha;
        }
    }

    a {
        color: lightskyblue;
        cursor: url('../assets/ms-cursor.png'), auto;
        &:hover {
            color: red;
        }
    }

    @include for-desktop-large-only {
        #FAQ > div {
            > p {
               font-size: 5em; 
            }
            > ol {
                font-size: 3em;
            } 
        }
    }

    @include for-tablet-small-only {
        .sublist {
            margin-left: 20px;
        }
    }

    @include for-mobile-only {
        #FAQ > div > ol {
            margin-left: 0px;
        }
    }
</style>