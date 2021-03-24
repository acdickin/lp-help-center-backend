const TYPE_DEFINITION = `type SystemInfo {
  id: String!
  name: String!
  codename: String!
  language: String!
  type: String!
  lastModified: String!
}
interface ContentItem {
  system: SystemInfo!
}
type MultipleChoiceElementOption {
  name: String!
  codename: String
}
type TaxonomyTerm {
  name: String!
  codename: String
}
type Asset {
  name: String
  type: String
  size: Int
  description: String
  url: String
  width: Int
  height: Int
}
type Link {
  codename: String
  itemID: String
  urlSlug: String
  type: String
}
type RichTextImage {
  imageId: String!
  url: String!
  description: String
  width: Int
  height: Int
}
type TextElement {
  type: String!
  name: String!
  value: String
}
type NumberElement {
  type: String!
  name: String!
  value: Int
}
type DateTimeElement {
  type: String!
  name: String!
  value: String
}
type MultipleChoiceElement {
  type: String!
  name: String!
  value: [MultipleChoiceElementOption]
}
type UrlSlugElement {
  type: String!
  name: String!
  value: String
}
type TaxonomyElement {
  type: String!
  name: String!
  value: [TaxonomyTerm]
  taxonomyGroup: String
}
type AssetElement {
  type: String!
  name: String!
  value: [Asset]
}
type RichTextElement {
  type: String!
  name: String!
  value: String
  linkedItemCodenames: [String]
  links: [Link]
  images: [RichTextImage]
  resolvedHtml: String
}
type LinkedItemsElement {
  type: String!
  name: String!
  value: [ContentItem]
  itemCodenames: [String]
}
type CustomElement {
  type: String!
  name: String!
  value: String
}

type ChatVsMessagingContentType implements ContentItem {
  system: SystemInfo!
  chat_messaging: MultipleChoiceElement
}

type CodeSampleContentType implements ContentItem {
  system: SystemInfo!
  code: TextElement
  language: MultipleChoiceElement
}

type ContentRequestContentType implements ContentItem {
  system: SystemInfo!
  content_request_links: RichTextElement
  missing_something_title: RichTextElement
}

type DashboardContentType implements ContentItem {
  system: SystemInfo!
  table2: RichTextElement
  missing_something: RichTextElement
  overview_description: RichTextElement
  text_with_image: RichTextElement
  table1: RichTextElement
  text_with_images: RichTextElement
}

type DcBotTemplatesContentType implements ContentItem {
  system: SystemInfo!
  untitled_rich_text_03ca0f1: RichTextElement
  untitled_rich_text: RichTextElement
  untitled_rich_text_cdae732: RichTextElement
  untitled_rich_text_e69977d: RichTextElement
}

type HomepageContentType implements ContentItem {
  system: SystemInfo!
  content: LinkedItemsElement
  title: TextElement
  subpages: LinkedItemsElement
}

type HowToAccessCbContentType implements ContentItem {
  system: SystemInfo!
  untitled_text: TextElement
  untitled_text_94676de: TextElement
}

type KcProductOverviewContentType implements ContentItem {
  system: SystemInfo!
  how_it_works: RichTextElement
  missing_something__missing_something_text: RichTextElement
  benefits: RichTextElement
  title: TextElement
  chat_messaging__chat_vs_messaging: MultipleChoiceElement
  introduction: RichTextElement
  use_cases: RichTextElement
  missing_something__missing_something_: TextElement
  key_components: RichTextElement
  next_steps__next_steps: RichTextElement
}

type LandingPageExampleContentTypeContentType implements ContentItem {
  system: SystemInfo!
  body: RichTextElement
  product_list: LinkedItemsElement
  title: TextElement
  url: UrlSlugElement
}

type NavigationItemContentType implements ContentItem {
  system: SystemInfo!
  subitems: LinkedItemsElement
  url: UrlSlugElement
  title: TextElement
}

type PageContentType implements ContentItem {
  system: SystemInfo!
  subpages: LinkedItemsElement
  url: UrlSlugElement
  show_in_navigation: MultipleChoiceElement
  title: TextElement
  content: LinkedItemsElement
}

type ProductDescriptionContentType implements ContentItem {
  system: SystemInfo!
  untitled_rich_text: RichTextElement
}

type ProductExampleContentTypeContentType implements ContentItem {
  system: SystemInfo!
  url: UrlSlugElement
  description: RichTextElement
  name: TextElement
  image: AssetElement
  taxonomy___categorizing_target_audience: TaxonomyElement
}

type ProductOverviewContentType implements ContentItem {
  system: SystemInfo!
  body: RichTextElement
  title: TextElement
  meta_description: TextElement
  why_the_product_is_useful: RichTextElement
  post_tags: TaxonomyElement
  untitled_linked_items: LinkedItemsElement
  url: UrlSlugElement
  meta_keywords: TextElement
  product_description: RichTextElement
}

type TooltipContentType implements ContentItem {
  system: SystemInfo!
  metric_name: TextElement
  tooltip_text: TextElement
}

type UntitledContentTypeContentType implements ContentItem {
  system: SystemInfo!
  untitled_linked_items: LinkedItemsElement
}

type UntitledContentType40da789ContentType implements ContentItem {
  system: SystemInfo!
  content_type: RichTextElement
}

type UserGuideContentType implements ContentItem {
  system: SystemInfo!
  brand_benefits: RichTextElement
}

type Video2ContentType implements ContentItem {
  system: SystemInfo!
  untitled_rich_text: RichTextElement
  untitled_asset: AssetElement
}`;

module.exports = {
  TYPE_DEFINITION
}