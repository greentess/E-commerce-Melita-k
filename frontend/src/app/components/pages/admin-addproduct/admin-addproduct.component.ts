import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-admin-addproduct',
  templateUrl: './admin-addproduct.component.html',
  styleUrls: ['./admin-addproduct.component.css'],
})
export class AdminAddproductComponent implements OnInit {
  id!: string;
  name!: string;
  price!: number;
  description!: string;
  imageUrl!: string;
  vars_coverage!: string;
  vars_handle!: string;
  tags!: string;
  origins!: string;

  coverage_mas!: string[];
  coverage_str!: string;

  handle_mas!: string[];
  handle_str!: string;

  tags_mas!: string[];
  tags_str!: string;

  origins_mas!: string[][];

  vars_color!: string;
  color_mas!: string[];
  color_str!: string;

  vars_mod!: string;
  mod_mas!: string[];
  mod_str!: string;

  itemService;
  router;
  route;

  editMode: boolean = false;

  er: string = '';
  er_id: number = 0;

  static get parameters() {
    return [ItemService, ActivatedRoute, Router];
  }

  constructor(
    private userService: UserService,
    itemService: ItemService,
    route: ActivatedRoute,
    router: Router
  ) {
    this.itemService = itemService;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['itemId']) {
        let itemId = params['itemId'];
        this.editMode = true;
        console.log(this.editMode);

        this.itemService.getItembyId(itemId).subscribe((item) => {
          this.id = item.id;
          this.name = item.name;
          this.price = item.price;
          this.description = item.description;
          this.imageUrl = item.imageUrl;

          let vars_coverage = item.variants?.filter((value =>value.type==="Покрытие"))
          let vars_handle = item.variants?.filter((value =>value.type==="Рукоять"))
          let vars_color = item.variants?.filter((value =>value.type==="Цвет"))
          let vars_mod = item.variants?.filter((value =>value.type==="Модификация"))


          let coverage_str: string = vars_coverage!.join(',');
          this.vars_coverage = coverage_str;

          let handle_str: string = vars_handle!.join(',');
          this.vars_handle = handle_str;

          let tags_str: string = item.tags!.join(',');
          this.tags = tags_str;

          const join = (
            array: any,
            separators: string[],
            depth: number
          ): any => {
            if (depth < separators.length - 1) {
              return array
                .map((el: any) => join(el, separators, depth + 1))
                .join(separators[depth]);
            } else {
              return array.join(separators[depth]);
            }
          };

          const separators = [',', ':'];
          console.log(join(item.origins!, separators, 0));
          this.origins = join(item.origins!, separators, 0);

          let color_str: string = vars_color!.join(',');
          this.vars_color = color_str;

          let mod_str: string = vars_mod!.join(',');
          this.vars_mod = mod_str;
        });
      }
    });
  }

  addItem() {
    if (this.editMode) {
      console.log(this.id);

      let coverage_mas: string[] = this.vars_coverage.split(',');
      let handle_mas: string[] = this.vars_handle.split(',');
      let tags_mas: string[] = this.tags.split(',');

      let origins_mas: string[][] = this.origins
        .split(',')
        .map((e) => e.split(':'));

      let color_mas: string[] = this.vars_color.split(',');

      let mod_mas: string[] = this.vars_mod.split(',');

      if (this.name === undefined || this.name === '') this.name = 'Товар1';
      if (this.price === undefined || this.price < 0) this.price = 1;
      let itemData = {
        id: this.id,
        name: this.name,
        price: this.price,
        description: this.description,
        imageUrl: this.imageUrl,
        vars_coverage: coverage_mas,
        vars_handle: handle_mas,
        tags: tags_mas,
        origins: origins_mas,
        vars_color: color_mas,
        vars_mod: mod_mas,
      };

      this.itemService.updateItem(itemData).subscribe((result) => {
        this.router.navigate(['/manage']);
      });
    } else {
      let coverage_mas: string[] = [];
      if (this.vars_coverage != undefined)
        coverage_mas = this.vars_coverage.split(',');

      let handle_mas: string[] = [];
      if (this.handle_mas != undefined)
        handle_mas = this.vars_handle.split(',');

      let tags_mas: string[] = [];
      if (this.tags_mas != undefined) tags_mas = this.tags.split(',');

      let origins_mas: string[][] = [];
      if (this.origins_mas != undefined)
        origins_mas = this.origins.split(',').map((e) => e.split(':'));

      let color_mas: string[] = [];
      if (this.color_mas != undefined) color_mas = this.vars_color.split(',');

      let mod_mas: string[] = [];
      if (this.mod_mas != undefined) mod_mas = this.vars_mod.split(',');

      if (this.name === undefined || this.name === '') this.name = 'Товар1';
      if (this.price === undefined || this.price < 0) this.price = 1;
      let itemData = {
        name: this.name,
        price: this.price,
        description: this.description,
        imageUrl: this.imageUrl,
        vars_coverage: coverage_mas,
        vars_handle: handle_mas,
        tags: tags_mas,
        origins: origins_mas,
        vars_color: color_mas,
        vars_mod: mod_mas,
      };

      this.itemService.addItem(itemData).subscribe((res) => {
        this.router.navigate(['/manage']);
      });
    }
  }
  get isAdmin() {
    return this.userService.getUserFromLocalStorage().isAdmin;
  }

  public inputValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/^[0-9]*$/g, '');
    }
  }

  detailscat: boolean = false;
  detailstech: boolean = false;
  detailscol: boolean = false;
  detailsmod: boolean = false;
  detailshan: boolean = false;
  detailscov: boolean = false;
  detailsimg: boolean = false;

  showDetailsCat() {
    if (!this.detailscat) this.detailscat = true;
    else this.detailscat = false;
  }

  showDetailsTech() {
    if (!this.detailstech) this.detailstech = true;
    else this.detailstech = false;
  }
  showDetailsCol() {
    if (!this.detailscol) this.detailscol = true;
    else this.detailscol = false;
  }
  showDetailsMod() {
    if (!this.detailsmod) this.detailsmod = true;
    else this.detailsmod = false;
  }
  showDetailsHan() {
    if (!this.detailshan) this.detailshan = true;
    else this.detailshan = false;
  }
  showDetailsCov() {
    if (!this.detailscov) this.detailscov = true;
    else this.detailscov = false;
  }
  showDetailsImg() {
    if (!this.detailsimg) this.detailsimg = true;
    else this.detailsimg = false;
  }
}
