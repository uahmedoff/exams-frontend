<script>
    export default {
        methods: {
            correct_pages(index,current_page,per_page,total,order="asc"){
                let number;
                if(order == "asc"){
                    index = index + 1;
                    number = index + (current_page - 1) * per_page;
                }
                else if(order == "desc")
                    number = total - (index + (current_page - 1) * per_page);    
                return number;
            },
        },
    };
</script>
