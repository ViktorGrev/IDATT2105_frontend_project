<template>
    <div class="listItem">
        <div class="date">
            <slot name="dateBox">
                <!--Default content-->
                <span>21/03/2022</span>
            </slot>
        </div>
        <div class="title">
            <slot name="titleBox">
                <!--Default content-->
            The art of war The art of war  The art of war 
            </slot>
        </div>
        <div class="score">
            <slot name="scoreBox">
                <!--Default content-->
                <span>45/50</span>
            </slot>
        </div>
    </div>
</template>

<style scoped>
*{
    font-family: 'Poppins', sans-serif;
}

.listItem {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    min-width: 350px;
}

.date {
    flex: 0 0 20%;
    opacity: 0.5;
    justify-content: flex-start;
    text-align: left;
}

.title {
    flex: 60%;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.score {
    flex: 20%;
    justify-content: flex-end;
    text-align: right;
    background-color: none;
}


</style>